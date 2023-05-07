class CreateFretboards < ActiveRecord::Migration[7.0]
  def change
    create_table :fretboards do |t|
      t.integer :position, null: false
      t.integer :start_fret, null: false
      t.integer :end_fret, null: false

      t.references :score, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
