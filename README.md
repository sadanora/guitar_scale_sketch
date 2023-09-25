# Guitar Scale Sketch
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
- [Ruby 3.1.2](https://www.ruby-lang.org/ja/)
- [Ruby on Rails 7.0.4.3](https://rubyonrails.org/)
- [jsbundling-rails](https://github.com/rails/jsbundling-rails)
  - [esbuild](https://esbuild.github.io/)
- [Hotwire](https://hotwired.dev/)
  - turbo-rails
  - stimulus-rails
- [bootstrap 5.2.3](https://getbootstrap.jp/)
- [Slim](https://slim-template.github.io/)
- [Konva 9.2.0](https://konvajs.org/)
- [PostgreSQL](https://www.postgresql.org/)

### ソーシャルログイン
- Google OAuth
#### テスティングフレームワーク
- [RSpec 6.0.3](https://rspec.info/)

### Linter/Formatter
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Rubocop](https://docs.rubocop.org/rubocop/index.html)
- [Slim-Lint](https://github.com/sds/slim-lint)

### CI / CD
- [GitHub Actions](https://docs.github.com/ja/actions)
### インフラ
- [Fly.io](https://fly.io/)

## 開発環境の構築
### セットアップ
```bash
$ git clone https://github.com/sadanora/guitar_scale_sketch.git
$ cd  guitar_scale_sketch
$ bin/setup
```

### 環境変数の設定
環境変数名 | 説明
--- | ---
GOOGLE_ID | GoogleクライアントID
GOOGLE_SECRET | Googleクライアントシークレット

### 起動
```bash
$ bin/dev
```

### Lint
#### rubocop、slim-lint、eslint、prettier すべてを実行
```bash
$ bin/lint
```
#### 個別に実行
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

### テスト
```bash
$ bin/rails spec
```
