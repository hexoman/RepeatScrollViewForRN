import React, { Component } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types'

export default class RepeatScrollView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
            end: true,
        }
        dataLenght = this.state.data.length
        data = this.state.data.slice()
    }
    didScroll({ layoutMeasurement, contentOffset, contentSize }) {
        if (this.state.data.length >= dataLenght * 3)
            this.setState(prevState => ({
                data: prevState.data.slice(dataLenght * 2)
            }))

        if (contentOffset.x <= this.props.offset) {
            this.setState(prevState => ({
                data: [...prevState.data, ...data],
            }), () => this.list.scrollToIndex({ index: dataLenght, animated: false }))
        }
        if (layoutMeasurement.width + contentOffset.x >= contentSize.width - this.props.offset && this.state.end) {
            this.setState(prevState => ({
                data: [...prevState.data, ...data],
                end: false
            }))
        }
        else {
            this.setState({
                end: true
            })
        }

    }
    componentDidMount() {
        this.setState(prevState => ({
            data: [...prevState.data, ...prevState.data]
        }))
        setTimeout(() => { this.list.scrollToIndex({ animated: false, index: dataLenght }) }, 500);
    }
    render() {
        return (
            <FlatList
                {...this.props}
                ref={(ref) => { this.list = ref; }}
                data={this.state.data}
                renderItem={this.props.renderItem}
                horizontal={true}
                onScroll={({ nativeEvent }) => this.didScroll(nativeEvent)}
                showsVerticalScrollIndicator={this.props.showsVerticalScrollIndicator}
            />
        );
    }
}

RepeatScrollView.propTypes = {
    offset: PropTypes.number,
    showsVerticalScrollIndicator: PropTypes.bool
}

RepeatScrollView.defaultProps = {
    offset: 20,
    showsVerticalScrollIndicator: false
}