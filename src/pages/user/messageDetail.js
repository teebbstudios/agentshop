import React,{Component} from 'react';
import {
    StyleSheet,
} from 'react-native';
import FlatList from "../../components/flatList";
import { ListEmptyView } from '../../utils/view'

export default class UserMessageDetail extends Component{
    render(){
        const { navigation } = this.props;
        const { type_id } = navigation.state.params
        return(
            <FlatList
                ref={e=>this.FlatList=e}
                keyExtractor={e => String(e.id)}
                renderItem={ data => (
                    <MessageItem
                        navigation={navigation}
                        data={data.item}
                    />
                )}
                api='MESSAGESEARCH'
                fetchParams={{type_id}}
                ListEmptyComponent={()=>(
                    <ListEmptyView
                        uri={require('../../images/fetchStatus/messageEmpty.png')}
                        desc='暂时没有相关消息'
                    />
                )}
            />
        )
    }
}

const styles=StyleSheet.create({

})
