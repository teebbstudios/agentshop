import React,{Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { List } from 'antd-mobile-rn';
import FlatList from "../../components/flatList";
import { ListEmptyView } from '../../utils/view'
import { PublicStyles } from '../../utils/style'

const Item = List.Item;

export default class UserMessage extends Component{
    render(){
        const { navigation } = this.props
        return(
            <View style={PublicStyles.ViewMax}>
                <FlatList
                    ref={e => this.FlatList = e}
                    keyExtractor={e => String(e.id)}
                    renderItem={data => (
                        <MessageItem
                            navigation={navigation}
                            data={data.item}
                        />
                    )}
                    api='MESSAGESEARCH'
                    fetchParams={{
                        type_id: 1
                    }}
                    ListEmptyComponent={() => (
                        <ListEmptyView
                            uri={require('../../images/fetchStatus/messageEmpty.png')}
                            desc='暂时没有相关消息'
                        />
                    )}
                />
            </View>
        )
    }
}

const styles=StyleSheet.create({

})
