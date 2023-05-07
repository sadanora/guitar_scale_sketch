json.id @score.id
json.title @score.title

json.fretboards @score.fretboards do |fretboard|
  json.frets fretboard.frets do |frets|
    json.id frets.id
    json.fretNumber frets.fret_number
    json.E1 frets.E1
    json.B2 frets.B2
    json.G3 frets.G3
    json.D4 frets.D4
    json.A5 frets.A5
    json.E6 frets.E6
  end
end
