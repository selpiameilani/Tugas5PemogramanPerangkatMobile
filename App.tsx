import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

interface User {
  id: {value: string};
  name: {first: string; last: string};
  email: string;
  picture: {medium: string};
  phone: string;
  gender: string;
  location: {city: string; country: string};
  dob: {age: number};
  registered: {date: string};
  nat: string;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api/?results=9');
      setUsers(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter(user => user.id.value !== id));
  };

  const handleEdit = (id: string) => {
    // Add your edit functionality here if needed
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const getAnimeImage = (index: number) => {
    // Replace these URLs with actual URLs to anime images
    const animeImages = [
      'https://cdn0-production-images-kly.akamaized.net/5CihQRuC_YMTsr04DTYQNAP0JrE=/640x360/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3706636/original/070749900_1639530202-tom.jpg',
      'https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//93/MTA-71431607/oem_mouse_pad_komputer_-_laptop_karakter_kartun_lucu_full14_cu06d7qp.jpg',
      'https://img.lovepik.com/photo/45011/9249.jpg_wh860.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk0iKLxI0izfpsavEDy7JzLG5kB8Rl_LUHtA&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJOanYFbTOOo9Bcm4Pz7YjnWi7U-0iMPBEeQ&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1EuBsWaeZW3aIYlywJ6e25LJEdxLtIhKHLQ&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsctVZl4u-X3PN--90dfleEXvXb_K8_Dyrjw&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUbb35WLsF_bHH5FbkltfY0bgg1_jl1h0tbA&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrgxHDUD6QV95p-NN04QvybRztaSAW1dd7Nw&s',
    ];
    return animeImages[index % animeImages.length];
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>API dari Random User</Text>
      <TouchableOpacity style={styles.addButton} onPress={fetchUsers}>
        <Text style={styles.addButtonText}>Tambah User</Text>
      </TouchableOpacity>
      {users.map((user, index) => (
        <View key={index} style={styles.card}>
          <Image source={{uri: getAnimeImage(index)}} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.name}>
              {user.name.first} {user.name.last}
            </Text>
            <Text style={styles.description}>Gender: {user.gender}</Text>
            <Text style={styles.description}>Age: {user.dob.age}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEdit(user.id.value)}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(user.id.value)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
  },
  info: {
    marginTop: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: 'orange',
    padding: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
