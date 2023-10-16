class RemoveIsPublicFromFingering < ActiveRecord::Migration[7.0]
  def change
    remove_column :fingerings, :is_public, :boolean
  end
end
