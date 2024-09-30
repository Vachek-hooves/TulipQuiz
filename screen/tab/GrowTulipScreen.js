import { StyleSheet, Text, View,ImageBackground,TouchableOpacity} from "react-native";
import TabLayout from "../../components/ScreenLayout/TabLayout";

const GrowTulipScreen = ({navigation}) => {
  return (
  <TabLayout>
<TouchableOpacity onPress={()=>navigation.navigate('TulipFarmScreen')}>
    <Text>Open Farm</Text>
</TouchableOpacity>
  </TabLayout>
  );
};

export default GrowTulipScreen;

const styles = StyleSheet.create({
    background:{
        flex:1,
        resizeMode:'cover',
        justifyContent:'center',
    }
});
