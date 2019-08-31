import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    ScrollView
} from 'react-native';
import fa from '../../utils/fa'
import AddressModel from '../../models/address'
import {Modal, Button} from 'antd-mobile-rn';
import {Field} from '../../components'
import arrayTreeFilter from "array-tree-filter";
import {StackActions} from "react-navigation";
import {connect} from 'react-redux'
import {PublicStyles} from '../../utils/style';

const addressModel = new AddressModel()

@connect(({
              view: {
                  address: {
                      areaList
                  }
              },
              app: {
                  user: {
                      userToken,
                  }
              },
          }) => ({
    areaList,
    userToken
}))
export default class UserAddressEdit extends Component {
    state = {
        id: null,
        truename: '',
        mobile_phone: '',
        type: '个人',
        area_id: '',
        address: '',
        is_default: true,
        combine_detail: null,
        checked: true,
    };

    async componentDidMount() {
        const id = this.props.navigation.getParam('id');
        const info = await addressModel.info({id});
        this.setState({
            id,
            truename: info.truename,
            mobile_phone: info.phone,
            type: info.type,
            area_id: info.area_id,
            address: info.address,
            is_default: info.is_default,
            combine_detail: info.combine_detail,
        })
    }

    onAreaChange({value}) {
        const {areaList} = this.props;
        const treeChildren = arrayTreeFilter(
            areaList, (item, level) => item.value === value[level]
        );

        this.setState({
            area_id: value[2],
            combine_detail: treeChildren.map(v => {
                return v.label;
            }).join(' ')
        })
    }

    onTruenameChange({value}) {
        this.setState({
            truename: value
        })
    }

    onMobilePhoneChange({value}) {
        this.setState({
            mobile_phone: value
        })
    }

    onAddressChange({value}) {
        this.setState({
            address: value
        })
    }

    onIsDefaultChange({value}) {
        this.setState({
            is_default: value ? 1 : 0
        })
    }

    async onDelete() {
        Modal.alert('您确认删除吗？一旦删除不可恢复', null, [
            {text: '取消', onPress: () => console.log('cancel'), style: 'cancel'},
            {
                text: '确认', onPress: async () => {
                    const {id} = this.state;
                    const result = await addressModel.del({
                        id
                    });
                    if (result === false) {
                        fa.toast.show({
                            title: fa.code.parse(addressModel.getException().getCode())
                        })
                    } else {
                        this.props.navigation.goBack()
                    }
                }
            },
        ]);
    }

    onSubmit = async () => {
        const {id, truename, mobile_phone, area_id, address, is_default, type} = this.state;
        const {userToken} = this.props;
        if (!truename) {
            return fa.toast.show({title: '请输入姓名'})
        }
        if (!mobile_phone) {
            return fa.toast.show({title: '请输入手机号'})
        }
        if (!area_id) {
            return fa.toast.show({title: '请选择所在地区'})
        }
        if (!address) {
            return fa.toast.show({title: '请填写楼栋楼层或房间号信息'})
        }
        let data = {
            id,
            truename,
            mobile_phone,
            address,
            is_default,
            type,
            area_id,
            userToken
        };

        const result = await addressModel.edit(data);
        if (result === false) {
            fa.toast.show({
                title: fa.code.parse(addressModel.getException().getCode())
            })
        } else {
            this.props.navigation.dispatch(StackActions.pop({n: 1}));
            const updateListRow = this.props.navigation.getParam('updateListRow')
            if (typeof updateListRow === 'function') {
                updateListRow(id)
            }
        }
    }

    render() {
        const {
            id,
            truename,
            mobile_phone,
            address,
            is_default,
            combine_detail,
        } = this.state;
        const {areaList} = this.props;
        if (!areaList || !id) {
            return null
        }
        return <View style={PublicStyles.ViewMax}>
            <ScrollView>
                <View style={{backgroundColor: '#fff'}}>
                    <Field
                        title="收货人："
                        placeholder="请输入姓名"
                        focus={true}
                        value={truename}
                        onChange={(e) => {
                            this.onTruenameChange(e)
                        }}
                    />
                    <Field
                        title="联系方式："
                        inputType="numeric"
                        placeholder="请输入手机号"
                        value={mobile_phone}
                        onChange={(e) => {
                            this.onMobilePhoneChange(e)
                        }}
                    />
                    <Field
                        title="所在地区："
                        type={'area'}
                        areaList={areaList}
                        value={[]}
                        areaNames={combine_detail ? combine_detail : '请选择地区'}
                        onChange={(e) => {
                            this.onAreaChange(e)
                        }}
                    />
                    <Field
                        title="详细地址："
                        value={address}
                        placeholder="填写楼栋楼层或房间号信息"
                        onChange={(e) => {
                            this.onAddressChange(e)
                        }}
                    />
                    <Field
                        title="设置默认地址："
                        desc="注：每次下单时会使用该地址"
                        type={'switch'}
                        checked={is_default}
                        onChange={(e) => {
                            this.onIsDefaultChange(e)
                        }}
                    />
                </View>
            </ScrollView>
            <SafeAreaView style={styles.buttonArea}>
                <Button
                    style={{borderRadius: 0, flex: 1}}
                    size="large"
                    onClick={() => {
                        this.onDelete(id)
                    }}
                >
                    删除地址
                </Button>
                <Button
                    style={{borderRadius: 0, flex: 1}}
                    type='primary'
                    size="large"
                    onClick={this.onSubmit}
                >
                    保存
                </Button>
            </SafeAreaView>
        </View>
    }
}
const styles = StyleSheet.create({
    buttonArea: {
        justifyContent: "space-between",
        flexDirection: 'row',
        marginTop: 15
    },
});

