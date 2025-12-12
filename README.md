
# Disaster Response Drone for Remote Areas

## What Your Project Does
This project develops a rugged, semi-autonomous disaster response drone capable of reaching remote and flooded areas where roads and ground infrastructure are damaged or inaccessible.  It delivers critical supplies such as medicines, food packets, and emergency kits while providing real-time situational awareness through onboard cameras and communication systems.

## Problem Statement & Solution
During large-scale disasters, logistics networks fail and communication infrastructure collapses, cutting off isolated regions from time-sensitive medical support and hindering coordination among rescue teams.  The proposed solution is an all-weather aerial platform that can autonomously navigate complex, debris-filled environments, locate affected zones, and safely deliver payloads without needing to land.

The drone uses GPS-guided navigation, ROS-based semi-autonomy, and obstacle avoidance to reach disaster zones while streaming thermal and optical imagery for better triage and resource allocation.  A custom winch and payload-drop mechanism allows safe, precise delivery, and mobile charging or deployment hubs support continuous operations over extended periods.
## Features

- Semi-autonomous mission execution using ROS-based navigation and control.
- GPS-driven targeting of disaster and danger zones for accurate supply delivery.
- AI-based human detection and counting using onboard vision models for survivor identification.
- Custom payload drop/winch mechanism enabling delivery without landing in rough terrain.
- LoRa-based low-bandwidth communication link for resilient data transfer when high-speed networks fail.
- Design optimized for real disaster conditions with rugged hardware and stable flight control.

## Technologies Used

- Flight Controller: Pixhawk running ArduPilot firmware with GPS for stabilization and navigation.
- Onboard Computer & Autonomy: Raspberry Pi using ROS 2 and Python for mission logic and YOLOv8-based vision.
- Communication & I/O: ESP32 microcontroller handling LoRa communication and interface with ground systems.
- Vision / AI: YOLOv8 model for real-time pedestrian and survivor detection.
- Simulation & Planning: PX4/ArduPilot tools, QGroundControl, Gazebo, and ROS 2 Humble for navigation and path planning tests.

  
- Programming Languages: Python, NumPy, Ultralytics, C/C++,Html, CSS, JavaScript etc.  
- Database: SQL, NoSQL

## Steps to Install and Run

### Prerequisites
- A development PC with ROS 2 Humble installed (Linux recommended).
- QGroundControl and Gazebo (or equivalent) for simulation and mission planning.
- ArduPilot/Pixhawk-compatible ground tools and firmware flashing utilities.
- Python environment with required libraries for YOLOv8 and communication (e.g., `ultralytics`, `opencv-python`, `pyserial`, etc.).


### Installation
1. Clone or download the project repository into your workspace.  
2. Set up the ROS 2 workspace and install Python dependencies using your `requirements.txt` or setup script.  
3. Flash ArduPilot (or relevant firmware) onto the Pixhawk and configure basic parameters (frame type, GPS, radio, failsafes).


### Running the Project
1. Power on the drone hardware (Pixhawk, Raspberry Pi, ESP32, sensors, and communication modules).
2. Launch the ROS 2 autonomy stack on the Raspberry Pi to start navigation, AI detection, and mission control nodes.
3. Use QGroundControl (or equivalent GCS) to upload missions, monitor telemetry, and supervise the drone during operation or simulation.


## Environment Variables (if required)
If your implementation needs configuration values, document them here, for example:
- `DRONE_PORT` – Serial or UDP port used to connect to Pixhawk.  
- `LORA_PORT` – Port or interface for ESP32/LoRa communication.  
- `MODEL_PATH` – Filesystem path to the YOLOv8 weight file.  


- Flight path and altitude plots from Gazebo or QGroundControl missions.
- Images showing AI-based survivor detection bounding boxes and payload-drop operations during tests.
