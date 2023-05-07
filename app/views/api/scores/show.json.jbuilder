json.id @score.id
json.title @score.title

json.fretboards @score.fretboards do |fretboard|
  json.frets fretboard.frets, :id, :fret_number, :E1, :B2, :G3, :D4, :A5, :E6
end
