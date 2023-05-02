class CreateDots < ActiveRecord::Migration[7.0]
  def change
    create_table :dots do |t|
      t.integer :fret, null: false
      t.integer :string, null: false
      t.string :color, null: false

      t.references :fretboard, null: false, foreign_key: true, type: :integer

      t.timestamps
    end
  end
end
