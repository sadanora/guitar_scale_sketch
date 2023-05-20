Score.create(
  [
    {
      "title": "BlueNote Scale",
      "is_public": true,
      "score_code": <<~'EOS'
      [
        {
          "position": 0,
          "start_fret": 1,
          "end_fret": 5,
          "dots": [
            {
              "string": 1,
              "fret": 1,
              "color": "#333"
            },
            {
              "string": 1,
              "fret": 1,
              "color": "red"
            }
          ]
        },
        {
          "position": 1,
          "start_fret": 3,
          "end_fret": 10,
          "dots": [
            {
              "string": 1,
              "fret": 3,
              "color": "red"
            },
            {
              "string": 6,
              "fret": 5,
              "color": "black"
            }
          ]
        }
      ]
      EOS
    },
    {
      "title": "CMajor Scale",
      "is_public": false,
      "score_code": <<~'EOS'
      [
        {
          "position": 0,
          "start_fret": 3,
          "end_fret": 6,
          "dots": [
            {
              "string": 2,
              "fret": 3,
              "color": "blue"
            },
            {
              "string": 4,
              "fret": 5,
              "color": "yellow"
            }
          ]
        },
        {
          "position": 1,
          "start_fret": 11,
          "end_fret": 17,
          "dots": [
            {
              "string": 6,
              "fret": 12,
              "color": "red"
            },
            {
              "string": 3,
              "fret": 16,
              "color": "black"
            }
          ]
        }
      ]
      EOS
    }
  ]
)
