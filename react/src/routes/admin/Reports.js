import React from "react";
import { connect } from "dva";
import { Table, Form, Button } from "antd";

const FormItem = Form.Item;
const columns = [
  { dataIndex: "id", title: "#", width: "50px" },
  { dataIndex: "song.name", title: "曲目" },
  { dataIndex: "reason", title: "原因" },
  { dataIndex: "time", title: "时间" }
];

class Reports extends React.Component {
  state = {
    selected: []
  };

  onSelectChange = selected => {
    this.setState({ selected: selected });
  };

  handleDelete = id => {
    const { dispatch } = this.props;
    dispatch({ type: "reports/delete", payload: id });
  };

  renderExpanded = row => {
    const { loading } = this.props;
    return (
      <div>
        <Form layout="inline">
          <FormItem label="曲目ID">{row.song_id}</FormItem>
          <FormItem label="原因">{row.reason}</FormItem>
          <FormItem label="时间">{row.time}</FormItem>
          <br />
          <FormItem label="试听">
            <audio src={row.song.file.url} controls="controls" />
          </FormItem>
          <FormItem label="操作">
            <Button
              type="danger"
              icon="delete"
              loading={loading.effects["reports/delete"]}
              onClick={() => this.handleDelete([row.id])}
            >
              删除
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  };

  render() {
    const { reports, loading } = this.props;
    const { list } = reports;
    const { selected } = this.state;
    const rowSelection = {
      selected,
      onChange: this.onSelectChange
    };

    return (
      <div>
        <div style={{ fontSize: "14px", color: "#777" }}>
          举报总数: {list.length} 条 已选中: {selected.length} 条
        </div>
        <br />
        <Table
          dataSource={list}
          columns={columns}
          rowSelection={rowSelection}
          expandedRowRender={this.renderExpanded}
          rowKey="id"
          scroll={{ x: 600 }}
          loading={loading.effects["reports/fetch"]}
          style={{ width: "100%" }}
        />
        <Button
          type="danger"
          loading={loading.effects["reports/delete"]}
          onClick={() => {
            this.handleDelete(this.state.selected);
            this.setState({ selected: [] });
          }}
        >
          删除所选
        </Button>
      </div>
    );
  }
}

export default connect(({ reports, loading }) => ({ reports, loading }))(
  Reports
);
