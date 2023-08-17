class ChangeIsPublicInScores < ActiveRecord::Migration[7.0]
  def change
    change_column :scores, :is_public, :boolean, default: false, null: false
  end
end
