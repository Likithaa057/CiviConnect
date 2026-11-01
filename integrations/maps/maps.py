import json
import os

# Location of the JSON storage file
FILE_PATH = os.path.join(
    os.path.dirname(__file__),
    "storage",
    "locations.json"
)


# 1. Validate location
def validate_location(latitude, longitude):

    if -90 <= latitude <= 90 and -180 <= longitude <= 180:
        return True
    else:
        return False


# 2. Get location (for testing)
def get_location():

    latitude = float(input("Enter latitude: "))
    longitude = float(input("Enter longitude: "))

    if validate_location(latitude, longitude):
        return {
            "latitude": latitude,
            "longitude": longitude
        }
    else:
        return None


# 3. Save location
def save_location(latitude, longitude):

    if validate_location(latitude, longitude):
        return {
            "latitude": latitude,
            "longitude": longitude
        }
    else:
        return None


# 4. Store location permanently
def store_location(latitude, longitude):

    location = save_location(latitude, longitude)

    if location is None:
        return False

    if os.path.exists(FILE_PATH):
        with open(FILE_PATH, "r") as file:
            locations = json.load(file)
    else:
        locations = []

    locations.append(location)

    with open(FILE_PATH, "w") as file:
        json.dump(locations, file, indent=4)

    return True


# 5. Check stored locations
def check_locations():

    if not os.path.exists(FILE_PATH):
        return []

    with open(FILE_PATH, "r") as file:
        return json.load(file)

def process_location(latitude, longitude):

    try:
        latitude = float(latitude)
        longitude = float(longitude)
    except (ValueError, TypeError):
        return None

    if validate_location(latitude, longitude):
        return {
            "latitude": latitude,
            "longitude": longitude
        }

    return None