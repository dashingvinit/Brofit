import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

// Import Raxios and other dependencies here if needed

// Function to pick an image from the device
export async function pickImage() {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
  });

  if (!result.canceled) {
    setImageUri(result.assets[0].uri);
  }
}

// Function to get a pre-signed URL from the backend
export async function getPreSignedUrl() {
  try {
    const user = await SecureStore.getItemAsync('user');
    const parsedUser = JSON.parse(user);
    const userId = parsedUser.userId;
    const gymId = parsedUser.gymId;
    const format = `image/${imageUri.split('.').pop()}`;
    const SignedUrl = await Raxios.post(
      `/userProfile/profilePic/${userId}/${gymId}`,
      {
        format: format,
      }
    );
    setHeaders(SignedUrl.headers);
    return SignedUrl.data.data;
  } catch (err) {
    console.error('Error getting signed URL', err);
    return null;
  }
}

// Function to get a blob from the image URI
export async function getBlob(uri) {
  const base64String = await FileSystem.readAsStringAsync(uri, {
    encoding: 'base64',
  });
  return base64String;
}

// Function to upload the image using the pre-signed URL
export async function uploadUsingPresignedUrl() {
  setIsLoading(true);
  const signedUrl = await getPreSignedUrl();
  const imageBody = await getBlob(imageUri);

  fetch(signedUrl, {
    method: 'PUT',
    body: imageBody,
    headers: {
      ...headers,
    },
  })
    .then((response) => {
      if (response.ok) {
        alert('Profile Updated');
        setImageUri('');
        fetchProfilePic();
        setIsLoading(false);
      }
    })
    .catch((err) => {
      setIsLoading(false);
      alert('Error Uploading Image');
      console.error(err);
    });
}

// Function to fetch the profile picture from the backend
export async function fetchProfilePic() {
  try {
    const user = await SecureStore.getItemAsync('user');
    const parsedUser = JSON.parse(user);
    const userId = parsedUser.userId;
    const gymId = parsedUser.gymId;

    const profilePic = await Raxios.get(
      `/userProfile/profilePic/${userId}/${gymId}`
    );
    const imageUrl = profilePic.data.data;
    const binaryString = await getBase64StringFromHttpsSource(imageUrl);
    setImage(`data:image/jpeg;base64,${binaryString}`);
  } catch (err) {
    console.log(err);
  }
}

// Function to get a base64 string from an HTTPS source
export async function getBase64StringFromHttpsSource(imageUrl) {
  const response = await fetch(imageUrl);
  const text = await response.text();
  return text;
}
