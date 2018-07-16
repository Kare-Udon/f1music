import React from "react";
import { connect } from "dva";
import styles from "./Login.css";
import { Link } from "dva/router";
import { Form, Icon, Button, Input, Alert } from "antd";

const FormItem = Form.Item;

const Login = ({
  loading,
  dispatch,
  error,
  msg,
  form: { getFieldDecorator, validateFieldsAndScroll }
}) => {
  const handleSubmit = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      dispatch({ type: "login/login", payload: values });
    });
  };

  const validatePassword = (rule, value, callback) => {
    if (value === "123456") {
      callback("为保证投票质量目前禁止使用校网初始密码登录,请更改密码");
    }
    callback();
  };

  return (
    <div>
      <div className={styles.login}>
        <div style={{ width: "300px", margin: "auto" }}>
          <div
            style={{
              fontSize: "30px",
              textAlign: "center",
              marginBottom: "20px"
            }}
          >
            <b>登录</b>
          </div>
          <Form>
            <FormItem hasFeedback>
              {getFieldDecorator("stuId", {
                rules: [
                  { required: true, message: "请输入学号" },
                  { min: 10, message: "学号应为10或11位" },
                  { max: 11, message: "学号应为10或11位" }
                ]
              })(<Input placeholder="学号" />)}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "请输入密码" },
                  { validator: validatePassword }
                ]
              })(<Input type="password" placeholder="校园网密码" />)}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                onClick={handleSubmit}
                loading={loading}
                style={{ width: "100%" }}
              >
                登录
              </Button>
            </FormItem>
          </Form>
          <Link to="/" style={{ fontSize: "13px", color: "#777" }}>
            <Icon type="arrow-left" /> 返回首页
          </Link>
        </div>
      </div>
      <canvas width="1080" height="1608" id="curve" />
    </div>
  );
};

function mapStateToProps(state) {
  const { error, msg } = state.login;
  return { loading: state.loading.models.login, error, msg };
}

export default connect(mapStateToProps)(Form.create()(Login));
