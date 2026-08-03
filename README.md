# Guitar Scale Sketch

<img width="989" alt="KV" src="https://github.com/sadanora/guitar_scale_sketch/assets/66685066/d5da91dd-71df-4ca4-83c1-639b5a9fb047">

**いま反復練習したいスケール、運指に最適化された綺麗で見やすい指板図がさっと手に入る**

Guitar Scale Sketchは、ギターの指板図を人に渡したり自分用に保存したい人向けの指板図作成ツールです。

指板の幅をきめてドットを打つだけで指板図を素早く作成できます。

作った指板図はブラウザから印刷したり、URLをシェアして共有できます。

### こんな問題を解決します

- ネットや書籍に掲載されている指板図でもいいけど、実は自分がいま練習したい運指には情報が多すぎる/少なすぎる
- 自分で綺麗な指板図を作るのが手間
  - Guitar Scale Sketchを使うことによって、指板の図を書き、抑えるポジションに印を付け、色を選択し、作った指板図を印刷用にレイアウトする、といった手間がなくなります。

### サービスURL

https://guitar-scale-sketch.com/

## 使用技術

- [Ruby 4.0.6](https://www.ruby-lang.org/ja/)
- [Ruby on Rails 8.1.3.1](https://rubyonrails.org/)
- [Node.js 24.18.0](https://nodejs.org/)
- [Yarn 4.18.0](https://yarnpkg.com/)
- [jsbundling-rails](https://github.com/rails/jsbundling-rails)
  - [esbuild 0.28.1](https://esbuild.github.io/)
- [Hotwire](https://hotwired.dev/)
  - [Turbo 8.0.23](https://turbo.hotwired.dev/)
  - [Stimulus 3.2.2](https://stimulus.hotwired.dev/)
- [Bootstrap 5.3.8](https://getbootstrap.jp/)
- [Slim](https://slim-template.github.io/)
- [Konva 10.3.0](https://konvajs.org/)
- [PostgreSQL](https://www.postgresql.org/)

### ソーシャルログイン

- [OmniAuth Google OAuth2](https://github.com/zquestz/omniauth-google-oauth2)
- [OmniAuth - Rails CSRF Protection](https://github.com/cookpad/omniauth-rails_csrf_protection)

### テスティングフレームワーク

- [RSpec 6.1.3](https://rspec.info/)

### Linter/Formatter

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Rubocop](https://docs.rubocop.org/rubocop/index.html)
- [Slim-Lint](https://github.com/sds/slim-lint)

### CI / CD

- [GitHub Actions](https://docs.github.com/ja/actions)

### インフラ

- [Fly.io](https://fly.io/)

## インストールと起動

### 前提

Ruby 4.0.6、Node.js 24.18.0、PostgreSQLをあらかじめインストールしてください。Node.jsとRubyのバージョン管理に[mise](https://mise.jdx.dev/)を利用する場合は、`$ mise install`で必要なバージョンをインストールできます。

### セットアップと起動

```bash
$ git clone https://github.com/sadanora/guitar_scale_sketch.git
$ cd guitar_scale_sketch
$ corepack enable
$ bin/setup
```

`bin/setup`は依存パッケージとデータベースを準備した後、`bin/dev`を実行します。`bin/dev`はRailsサーバーに加えて、JavaScriptとCSSのwatcherを起動します。

## 環境変数の設定

| 環境変数名           | 説明                           |
| -------------------- | ------------------------------ |
| GOOGLE_CLIENT_ID     | GoogleクライアントID           |
| GOOGLE_CLIENT_SECRET | Googleクライアントシークレット |

## Linter / Formatter

rubocop

```bash
$ bundle exec rubocop
```

slim-lint

```bash
$ bundle exec slim-lint app/views -c config/slim_lint.yml
```

eslint

```bash
yarn eslint ./app/javascript
```

prettier

```bash
$ yarn prettier --check ./app/javascript
```

### 上記をまとめて実行

```bash
$ bin/lint
```

## テスト

```bash
$ bin/rails spec
```
