"use client";
import React from "react";

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: any }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);

    // 定义一个状态变量来跟踪是否存在错误
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    // 更新状态，以便下一次渲染将显示备用 UI

    return { hasError: true, error };
  }
  componentDidCatch(error: any, errorInfo: any) {
    // 可以在此处使用自己的错误日志服务
    console.log({ error, errorInfo });
  }
  render() {
    // 检查是否抛出错误
    if (this.state.hasError) {
      // 你可以渲染任何自定义的备用 UI
      return (
        <div className="hero bg-base-200 min-h-screen ">
          <div className="hero-content text-center bg-base-top rounded-lg p-5 w-[30vw]">
            <div className="max-w-md w-full">
              <h1 className="text-5xl font-bold">出错啦</h1>
              <pre
                className="py-6 max-h-[30vh] overflow-auto my-6 border text-left p-5"
                style={{
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                }}
              >
                {this.state.error.message}
              </pre>
              <button
                className="btn btn-primary mr-4"
                onClick={() => this.setState({ hasError: false })}
              >
                重试
              </button>
              <button
                className="btn btn-primary"
                onClick={() => (window.location.href = "/")}
              >
                返回首页
              </button>
            </div>
          </div>
        </div>
      );
    }

    // 如果没有错误，返回子组件

    return this.props.children;
  }
}

export default ErrorBoundary;
