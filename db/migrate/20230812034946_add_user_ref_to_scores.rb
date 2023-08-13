class AddUserRefToScores < ActiveRecord::Migration[7.0]
  def change
    add_reference :scores, :user, foreign_key: true
  end
end
