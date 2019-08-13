import { Platform } from "react-native";
import IosFlatList from "./iosFlatList";
import AndroidFlatList from "./androidFlatList";

const FlatList = Platform.OS === 'ios' ? IosFlatList : AndroidFlatList

export default FlatList