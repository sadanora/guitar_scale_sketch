class RenameScoreCodeColumnToFingeringCode < ActiveRecord::Migration[7.0]
  def change
    rename_column :fingerings, :score_code, :fingering_code
  end
end
