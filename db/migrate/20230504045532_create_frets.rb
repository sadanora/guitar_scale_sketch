class CreateFrets < ActiveRecord::Migration[7.0]
  def change
    create_table :frets do |t|
      t.integer :fret_number, null: false
      t.string :E1, null: false
      t.string :B2, null: false
      t.string :G3, null: false
      t.string :D4, null: false
      t.string :A5, null: false
      t.string :E6, null: false

      t.references :fretboard, null: false, foreign_key: true, type: :integer

      t.timestamps
    end
  end
end
