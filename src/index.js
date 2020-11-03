
import React from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
import AreaChart from './AreaChart';
import { getData, getOrders } from "./utils"
import { Tabs, Row, Statistic, Space, Col, Typography, Table } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const { TabPane } = Tabs;
const { Title } = Typography;

const columns = [
	{
	  title: '类型',
	  dataIndex: 'type',
	  key: 'type',
	},
	{
	  title: '价格',
	  dataIndex: 'price',
	  key: 'price',
	},
	{
		title: '订单号',
		dataIndex: 'orderId',
		key: 'orderId',
	},
	{
		title: '成交时间',
		dataIndex: 'datetime',
		key: 'datetime',
	}
];

function paginate(array, page_size, page_number) {
	return array.slice((page_number - 1) * page_size, page_number * page_size);
}

class ChartComponent extends React.Component {
	componentDidMount() {
		let data = getData();
		let orders = getOrders();

		console.log(data);
		this.setState({ data, orders });
	}
	render() {
		if (this.state == null) {
			return <div>Loading...</div>
		}
		return (
			<div>
				<Row>
					<Chart data={this.state.data} />
				</Row>
				<Row style={{margin: "50px"}}>
					<Space direction='horizontal' size="large" > 
						<Statistic title="净利润" value={112893} />
						<Statistic title="所有已平仓交易" value={12} />
						<Statistic precision={2} valueStyle={{ color: '#3f8600' }} prefix={<ArrowUpOutlined />} title="胜率" value={12} suffix={'%'} />
						<Statistic precision={2} valueStyle={{ color: '#cf1322' }} prefix={<ArrowDownOutlined />} title="最大回撤" value={23} suffix={'%'} />
						<Statistic precision={2} valueStyle={{ color: '#cf1322' }} prefix={<ArrowDownOutlined />} title="平均交易" value={2.3} suffix={'%'} />
						<Statistic title="平均持仓K线根" value={23} />
					</Space>
				</Row>
				<Row style={{margin: "50px"}}>
					<Col span="12">
						{
							this.state.data ? <AreaChart data={this.state.data} /> : null
						}
					</Col>
					<Col span="12">
						<Table dataSource={this.state.orders} pagination={{pageSize: 5}} columns={columns} />
					</Col>
				</Row>
			</div>
		)
	}
}

render(
	<ChartComponent />,
	document.getElementById("root")
);
