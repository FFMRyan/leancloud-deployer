# Fireball Demos on Leancloud

本 repo 用来存放 Fireball 在 Leancloud 上的 Html5 游戏 demo。可以通过

http://fbdemos.avosapps.com 

来访问。

## 开发者上传游戏方法

Fork 后通过 PR 提交以下内容：

- 将打包好的游戏资源传到 `public/my-game-name` 目录下，该目录里应该包括`index.html`文件
- 编辑 [public/index.html](public/index.html) 文件，添加一个链接指向刚添加的游戏路径，如：
  ```html
  <a href="./my-game-name"><h2>My Game Name</h2></a>
  ```

## 部署游戏

上传游戏代码后，需要执行部署命令才能更新 LeanCloud 对外的版本。

首先请安装 LeanCloud 的命令行工具：

```bash
npm install -g avoscloud-code
```