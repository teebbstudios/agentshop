import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView
} from 'react-native';
import {PublicStyles} from '../../../utils/style';
import fa from '../../../utils/fa'
import AddressModel from '../../../models/address'
import {Modal, Button} from 'antd-mobile-rn';
import {AddressCard} from '../../../components'
import {AddressApi} from "../../../config/api/address";
import FlatList from "../../../components/flatList";
import {connect} from "react-redux";

const addressModel = new AddressModel()

@connect(
    ({
         app: {
             user: {
                 login,
                 userInfo,
                 userToken,
             }
         }
     }) => ({
        login,
        userInfo,
        userToken,
    }),
)
export default class UserAddressList extends Component {
    async onDelete(id) {
        Modal.alert('您确认删除吗？一旦删除不可恢复', null, [
            {text: '取消', onPress: () => console.log('cancel'), style: 'cancel'},
            {
                text: '确认', onPress: async () => {
                    const result = await addressModel.del({id})
                    if (result) {
                        this.initList()
                    } else {
                        fa.toast.show({
                            title: fa.code.parse(addressModel.getException().getCode())
                        })
                    }
                }
            }
        ])
    }

    onEdit(id) {
        this.props.navigation.navigate('UserAddressEdit', {id, updateListRow: this.updateListRow})
    }

    onAdd() {
        this.props.navigation.navigate('UserAddressAdd', {updateListRow: this.updateListRow})
    }

    // todo id
    updateListRow = (id) => {
        this.FlatList.manuallyRefresh();
    };

    render() {
        const {userToken} = this.props;
        return <View style={[PublicStyles.ViewMax]}>
            <FlatList
                ref={e => this.FlatList = e}
                api={AddressApi.list}
                fetchParams={{userToken: userToken}}
                keyExtractor={e => String(e.id)}
                renderItem={({item}) => <AddressCard
                    name={item.truename}
                    phone={item.mobile_phone}
                    id={item.id}
                    isDefault={item.is_default}
                    address={item.combine_detail}
                    onEdit={(id) => {
                        this.onEdit(id)
                    }}
                />
                }
            />
            <SafeAreaView>
                <Button size="large" onClick={() => this.onAdd()}>+ 新建地址</Button>
            </SafeAreaView>
        </View>
    }
}
const styles = StyleSheet.create({})
