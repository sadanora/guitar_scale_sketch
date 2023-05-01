class CreateScores < ActiveRecord::Migration[7.0]
  def change
    create_table :scores, id: :uuid do |t|
      t.string :title, null: false
      t.boolean :is_public, null: false

      t.timestamps
    end
  end
end
