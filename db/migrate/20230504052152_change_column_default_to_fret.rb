class ChangeColumnDefaultToFret < ActiveRecord::Migration[7.0]
  def change
    change_column_default(:frets, :E1, from:nil, to: "")
    change_column_default(:frets, :B2, from:nil, to: "")
    change_column_default(:frets, :G3, from:nil, to: "")
    change_column_default(:frets, :D4, from:nil, to: "")
    change_column_default(:frets, :A5, from:nil, to: "")
    change_column_default(:frets, :E6, from:nil, to: "")
  end
end
