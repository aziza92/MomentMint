
# MomentMint  📸✨

![Static Badge](https://img.shields.io/badge/v8.1-b?logo=npm&label=npm) ![Static Badge](https://img.shields.io/badge/v16.13-b?label=nodeJs)
![Static Badge](https://img.shields.io/badge/VsCode-c?color=blue) ![Static Badge](https://img.shields.io/badge/React%20Native-c?color=blue) ![Static Badge](https://img.shields.io/badge/Java-c?color=red) ![Static Badge](https://img.shields.io/badge/Firebase-c?logo=Firebase&color=gray)


# 📝 Description

MomentMint is a mobile application developed with **React Native** that allows users to capture photos and apply artistic filters. It uses the device's camera to take pictures and provides various filters to personalize the images. Users can also view, delete, and save their photos.



##  🛠 Technologies Used

- **React Native** version `0.75.2`
- **VSCode** (recommended code editor) 💻
- **Redux** for state management ⚙️
- **react-native-vision-camera** for photo capture 📷
- **react-native-color-matrix-image-filters** for applying filters 🎨
- **react-navigation** for navigation between screens 🧭
- **react-native-vector-icons** for icons 🖼️

## 🌟 Features

### 1. **Photo Capture** 📸
   - Users can take a photo using the device's front or rear camera.
   - The interface provides a button to capture a photo and another to retake it.

### 2. **Apply Filters** 🎨
- After capturing a photo, several filters are available to personalize the image. Filters include:
 - **No Filter** ❌
     - **Juno** 🌈
     - **Sepia** 🟤
     - **Vintage** 🕰️
     - **Achro** 🖤
     - **Artistic** 🎨 (a custom filter)
   
### 3. **Gallery** 🖼️
   - Users can view their saved photos in a gallery.
   - Each photo can be enlarged and deleted with a confirmation.

### 4. **Save Photo** 💾
   - After applying a filter, users can save the photo to the gallery.
   - A temporary message confirms the successful saving of the photo.

### 5. **Delete Image** 🗑️
   - Users can delete a photo from the gallery with a confirmation before deletion.

## 🔧 Prerequisites

- Node.js (version 14.x or higher)
- Yarn or npm
- A simulator or physical device for testing the app

## 📥 Installation

- **Clone the project** from GitHub:
   ```bash
   git clone https://github.com/aziza92/MomentMint.git

## Development
   - **Navigation**: The app uses react-navigation to navigate between screens (e.g., from the home screen to the camera screen).
   - **Redux**: Redux is used to manage global state, especially for handling images and applied filters.
   - **Image Filtering**: Filters are applied using the react-native-color-matrix-image-filters library.


## 🤝 How to Contribute

Feel free to fork this repository, submit issues, and make pull requests. Any contributions to enhance the functionality and user experience of the Cinephile application are welcome.

📄 License

Copyright © 2024 Aziza Elgoul

This project is licensed under the [MIT](https://opensource.org/license/mit) License. See the LICENSE file for more details.
