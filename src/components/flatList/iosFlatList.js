import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    FlatList,
    ViewPropTypes,
} from 'react-native';
import { ThemeStyle } from '../../utils/style';
import Fetch from '../../utils/fetch';
import { ListEmptyView } from '../../utils/view';
import { removeEmpty, Toast } from "../../utils/function";
import {
    LottieIosRefreshControl
} from "../refreshControl";
import { ScrollView } from 'react-native-mjrefresh'

export default class IosFlatList extends Component {
    static propTypes = {
        ListEmptyComponent: PropTypes.func,
        getNativeData: PropTypes.func,
        onRefresh: PropTypes.func,
        contentContainerStyle: ViewPropTypes.style,
        changeDataStructurese: PropTypes.func,
        numColumns: PropTypes.number,
    };
    static defaultProps = {
        ListEmptyComponent: ({ fetchAllow }) => {
            return (
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    {
                        !fetchAllow &&
                        <ListEmptyView />
                    }
                    <Text style={{ fontSize: 15, color: ThemeStyle.ThemeColor, marginTop: 15 }}>
                        {fetchAllow ? '正在获取数据' : ''}
                    </Text>
                </View>
            )
        },
        getNativeData: () => {
        },
        onRefresh: () => {
        },
        contentContainerStyle: null,
        changeDataStructurese: null,
        numColumns: 1,
    };

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            fetchParams: this.props.fetchParams ? Object.assign(this.props.fetchParams, {
                page: 1,
                rows: 20,
            }) : { page: 1, rows: 20 },
            fetchAllow: true,
            isRefreshing: false,
            ListViewHeight: 0,
        };
        this.listViewRender = this.listViewRender.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData()
    }

    async fetchData() {
        const {
            fetchParams
        } = this.state;
        const {
            api
        } = this.props;

        if (this.state.fetchAllow) {
            this.state.fetchAllow = false;
            try {
                const e = await Fetch.fetch({
                    api,
                    params: fetchParams
                });
                if (e.code === 0) {
                    const {
                        getNativeData
                    } = this.props;
                    this.listViewRender(e.result);
                    getNativeData(e)
                } else {
                    Toast.warn(e.errmsg)
                }
            } catch (e) {
                this.setState({
                    isRefreshing: false
                })
            }
        }
    }

    listViewRender(e) {
        const { changeDataStructurese } = this.props;
        const { page, rows } = this.state.fetchParams;
        ++this.state.fetchParams.page;
        let totalNumber = 0;
        if (typeof e['total_number'] !== "undefined") {
            totalNumber = e.total_number
        }
        const totalPages = Math.ceil(totalNumber - rows);
        this.state.fetchAllow = totalPages > page;
        if (page === 1) {
            const dataSource = changeDataStructurese ? changeDataStructurese(e.list, []) : e.list;
            this.setState({ dataSource, isRefreshing: false });
        } else {
            const dataSource = changeDataStructurese ? changeDataStructurese(e.list, this.state.dataSource) : [...this.state.dataSource, ...e.list];
            this.setState({ dataSource, isRefreshing: false });
        }
        this.lottieRefresh && this.lottieRefresh.finishRefresh();
    }

    onRefresh() {
        const {
            fetchParams
        } = this.state
        this.setState({
            isRefreshing: true,
            fetchAllow: true,
            fetchParams: Object.assign(fetchParams, { page: 1 })
        }, () => {
            this.fetchData()
        })
    }

    manuallyRefresh() {
        this.setState({
            fetchAllow: true,
            fetchParams: Object.assign({}, this.state.fetchParams, { page: 1 })
        }, () => {
            this.fetchData()
        })
    }

    render() {
        const {
            dataSource
        } = this.state;
        const {
            keyboardDismissMode,
            renderItem,
            style,
            contentContainerStyle,
            ListFooterComponent,
            ListHeaderComponent,
            ListEmptyComponent,
            keyExtractor,
            onRefresh,
            numColumns,
            lottieSource,
        } = this.props;
        return (
            <FlatList
                keyboardDismissMode={this.props.keyboardDismissMode}
                ref={(e) => {
                    this.ListView = e
                }}
                data={dataSource}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                style={[{ flex: 1 }, style]}
                onEndReachedThreshold={600}
                onEndReached={() => {
                    this.fetchData()
                }}
                contentContainerStyle={[dataSource.length ? {} : { flex: 1 }, contentContainerStyle]}
                numColumns={numColumns}
                renderScrollComponent={props => <ScrollView
                    style={{ flex: 1 }}
                    refreshControl={
                        <LottieIosRefreshControl
                            ref={ref => this.lottieRefresh = ref}
                            onRefresh={()=>{
                                this.onRefresh();
                                onRefresh();
                            }}
                            lottieSource={lottieSource}
                        />
                    }
                    {...props}
                />}
                ListFooterComponent={ListFooterComponent}
                ListHeaderComponent={ListHeaderComponent}
                ListEmptyComponent={() => {
                    return ListEmptyComponent({ fetchAllow: this.state.fetchAllow })
                }}
            />
        )
    }

    setFetchParams(e) {
        this.ListView.scrollToOffset({ x: 0, y: 0, animated: false });
        this.setState({
            isRefreshing: true,
            fetchAllow: true,
            fetchParams: removeEmpty(Object.assign({}, this.state.fetchParams, e, { page: 1 }))
        }, () => {
            this.fetchData();
        });
    }
}