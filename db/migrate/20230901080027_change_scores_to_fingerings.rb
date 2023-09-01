class ChangeScoresToFingerings < ActiveRecord::Migration[7.0]
  def change
    rename_table :scores, :fingerings
  end
end
