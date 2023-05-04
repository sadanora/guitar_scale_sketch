# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_05_04_045532) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "fretboards", force: :cascade do |t|
    t.integer "position", null: false
    t.integer "start_fret", null: false
    t.integer "end_fret", null: false
    t.uuid "score_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["score_id"], name: "index_fretboards_on_score_id"
  end

  create_table "frets", force: :cascade do |t|
    t.integer "fret_number", null: false
    t.string "E1", null: false
    t.string "B2", null: false
    t.string "G3", null: false
    t.string "D4", null: false
    t.string "A5", null: false
    t.string "E6", null: false
    t.integer "fretboard_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["fretboard_id"], name: "index_frets_on_fretboard_id"
  end

  create_table "scores", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "title", null: false
    t.boolean "is_public", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "fretboards", "scores"
  add_foreign_key "frets", "fretboards"
end
