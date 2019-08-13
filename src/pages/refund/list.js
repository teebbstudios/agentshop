import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { RefundCard } from '../../components'
import RefundModel from '../../models/refund'
import FlatList from "../../components/flatList";
import { PublicStyles } from "../../utils/style";
import { RefundApi } from "../../config/api/refund";

const refundModel = new RefundModel()

export default class RefundList extends Component {
    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus', async () => {
            }
        );
    }

    onDetail(id) {
        this.props.navigation.navigate('RefundDetail', { id })
    }

    // 更新某条
    updateListRow = async(id) =>{
        // todo
        let { list } = this.state
        const listIndex = list.findIndex((row) => row.id === id)
        if (listIndex !== -1) {
            let requestParam = { page: 1, rows: 1, id: list[listIndex].id }
            const result = await refundModel.list(requestParam)
            if (result) {
                if (result.list.length === 0) {
                    list = list.splice(listIndex, 1)
                } else {
                    list[listIndex] = result.list[0]
                }
                this.setState({ list })
            }
        }
    }

    render() {
        return <View style={PublicStyles.ViewMax}>
            <FlatList
                ref={e => this.FlatList = e}
                keyExtractor={e => String(e.id)}
                api={RefundApi.list}
                renderItem={({ item }) => (
                    <View style={{marginBottom: 8}}>
                        <RefundCard
                            refundInfo={item}
                            onClick={() => {
                                this.onDetail(item.id)
                            }}
                        />
                    </View>
                )}
            />
        </View>
    }
}
const styles = StyleSheet.create({})
