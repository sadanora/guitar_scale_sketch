# frozen_string_literal: true

# Score.create(
#   [
#     {
#       "title": 'BlueNote Scale',
#       "is_public": true,
#       "score_code": <<~'TEXT'
#         [
#           {
#             "position": 1,
#             "startFret": 1,
#             "endFret": 5,
#             "dots": [
#               {
#                 "guitarString": 1,
#                 "fret": 1,
#                 "fill": "#555555"
#               },
#               {
#                 "guitarString": 1,
#                 "fret": 1,
#                 "fill": "#C7243A"
#               }
#             ]
#           },
#           {
#             "position": 2,
#             "startFret": 3,
#             "endFret": 10,
#             "dots": [
#               {
#                 "guitarString": 1,
#                 "fret": 3,
#                 "fill": "#C7243A"
#               },
#               {
#                 "guitarString": 6,
#                 "fret": 5,
#                 "fill": "#555555"
#               }
#             ]
#           }
#         ]
#       TEXT
#     },
#     {
#       "title": 'CMajor Scale',
#       "is_public": false,
#       "score_code": <<~'TEXT'
#         [
#           {
#             "position": 1,
#             "startFret": 3,
#             "endFret": 6,
#             "dots": [
#               {
#                 "guitarString": 2,
#                 "fret": 3,
#                 "fill": "#007FB1"
#               },
#               {
#                 "guitarString": 4,
#                 "fret": 5,
#                 "fill": "#EDAD0B"
#               }
#             ]
#           },
#           {
#             "position": 2,
#             "startFret": 11,
#             "endFret": 17,
#             "dots": [
#               {
#                 "guitarString": 6,
#                 "fret": 12,
#                 "fill": "#C7243A"
#               },
#               {
#                 "guitarString": 3,
#                 "fret": 16,
#                 "fill": "#555555"
#               }
#             ]
#           }
#         ]
#       TEXT
#     },
#     {
#       "title": 'DMajor Scale',
#       "is_public": false,
#       "score_code": <<~'TEXT'
#         [
#           {
#             "position": 1,
#             "startFret": 3,
#             "endFret": 6,
#             "dots": [
#               {
#                 "guitarString": 2,
#                 "fret": 3,
#                 "fill": "#007FB1"
#               },
#               {
#                 "guitarString": 4,
#                 "fret": 5,
#                 "fill": "#EDAD0B"
#               }
#             ]
#           },
#           {
#             "position": 2,
#             "startFret": 11,
#             "endFret": 17,
#             "dots": [
#               {
#                 "guitarString": 6,
#                 "fret": 12,
#                 "fill": "#C7243A"
#               },
#               {
#                 "guitarString": 3,
#                 "fret": 16,
#                 "fill": "#555555"
#               }
#             ]
#           }
#         ]
#       TEXT
#     },
#     {
#       "title": 'EMajor Scale',
#       "is_public": false,
#       "score_code": <<~'TEXT'
#         [
#           {
#             "position": 1,
#             "startFret": 3,
#             "endFret": 6,
#             "dots": [
#               {
#                 "guitarString": 2,
#                 "fret": 3,
#                 "fill": "#007FB1"
#               },
#               {
#                 "guitarString": 4,
#                 "fret": 5,
#                 "fill": "#EDAD0B"
#               }
#             ]
#           },
#           {
#             "position": 2,
#             "startFret": 11,
#             "endFret": 17,
#             "dots": [
#               {
#                 "guitarString": 6,
#                 "fret": 12,
#                 "fill": "#C7243A"
#               },
#               {
#                 "guitarString": 3,
#                 "fret": 16,
#                 "fill": "#555555"
#               }
#             ]
#           }
#         ]
#       TEXT
#     },
#     {
#       "title": 'FMajor Scale',
#       "is_public": true,
#       "score_code": <<~'TEXT'
#         [
#           {
#             "position": 1,
#             "startFret": 3,
#             "endFret": 6,
#             "dots": [
#               {
#                 "guitarString": 2,
#                 "fret": 3,
#                 "fill": "#007FB1"
#               },
#               {
#                 "guitarString": 4,
#                 "fret": 5,
#                 "fill": "#EDAD0B"
#               }
#             ]
#           },
#           {
#             "position": 2,
#             "startFret": 11,
#             "endFret": 17,
#             "dots": [
#               {
#                 "guitarString": 6,
#                 "fret": 12,
#                 "fill": "#C7243A"
#               },
#               {
#                 "guitarString": 3,
#                 "fret": 16,
#                 "fill": "#555555"
#               }
#             ]
#           }
#         ]
#       TEXT
#     },
#     {
#       "title": 'GMajor Scale',
#       "is_public": true,
#       "score_code": <<~'TEXT'
#         [
#           {
#             "position": 1,
#             "startFret": 3,
#             "endFret": 6,
#             "dots": [
#               {
#                 "guitarString": 2,
#                 "fret": 3,
#                 "fill": "#007FB1"
#               },
#               {
#                 "guitarString": 4,
#                 "fret": 5,
#                 "fill": "#EDAD0B"
#               }
#             ]
#           },
#           {
#             "position": 2,
#             "startFret": 11,
#             "endFret": 17,
#             "dots": [
#               {
#                 "guitarString": 6,
#                 "fret": 12,
#                 "fill": "#C7243A"
#               },
#               {
#                 "guitarString": 3,
#                 "fret": 16,
#                 "fill": "#555555"
#               }
#             ]
#           }
#         ]
#       TEXT
#     },
#     {
#       "title": 'AMajor Scale',
#       "is_public": true,
#       "score_code": <<~'TEXT'
#         [
#           {
#             "position": 1,
#             "startFret": 3,
#             "endFret": 6,
#             "dots": [
#               {
#                 "guitarString": 2,
#                 "fret": 3,
#                 "fill": "#007FB1"
#               },
#               {
#                 "guitarString": 4,
#                 "fret": 5,
#                 "fill": "#EDAD0B"
#               }
#             ]
#           },
#           {
#             "position": 2,
#             "startFret": 11,
#             "endFret": 17,
#             "dots": [
#               {
#                 "guitarString": 6,
#                 "fret": 12,
#                 "fill": "#C7243A"
#               },
#               {
#                 "guitarString": 3,
#                 "fret": 16,
#                 "fill": "#555555"
#               }
#             ]
#           }
#         ]
#       TEXT
#     },
#     {
#       "title": 'BMajor Scale',
#       "is_public": true,
#       "score_code": <<~'TEXT'
#         [
#           {
#             "position": 1,
#             "startFret": 3,
#             "endFret": 6,
#             "dots": [
#               {
#                 "guitarString": 2,
#                 "fret": 3,
#                 "fill": "#007FB1"
#               },
#               {
#                 "guitarString": 4,
#                 "fret": 5,
#                 "fill": "#EDAD0B"
#               }
#             ]
#           },
#           {
#             "position": 2,
#             "startFret": 11,
#             "endFret": 17,
#             "dots": [
#               {
#                 "guitarString": 6,
#                 "fret": 12,
#                 "fill": "#C7243A"
#               },
#               {
#                 "guitarString": 3,
#                 "fret": 16,
#                 "fill": "#555555"
#               }
#             ]
#           }
#         ]
#       TEXT
#     },
#     {
#       "title": 'A Minor Scale',
#       "is_public": true,
#       "score_code": <<~'TEXT'
#         [
#           {
#             "position": 1,
#             "startFret": 3,
#             "endFret": 6,
#             "dots": [
#               {
#                 "guitarString": 2,
#                 "fret": 3,
#                 "fill": "#007FB1"
#               },
#               {
#                 "guitarString": 4,
#                 "fret": 5,
#                 "fill": "#EDAD0B"
#               }
#             ]
#           },
#           {
#             "position": 2,
#             "startFret": 11,
#             "endFret": 17,
#             "dots": [
#               {
#                 "guitarString": 6,
#                 "fret": 12,
#                 "fill": "#C7243A"
#               },
#               {
#                 "guitarString": 3,
#                 "fret": 16,
#                 "fill": "#555555"
#               }
#             ]
#           }
#         ]
#       TEXT
#     },
#     {
#       "title": 'B Minor Scale',
#       "is_public": true,
#       "score_code": <<~'TEXT'
#         [
#           {
#             "position": 1,
#             "startFret": 3,
#             "endFret": 6,
#             "dots": [
#               {
#                 "guitarString": 2,
#                 "fret": 3,
#                 "fill": "#007FB1"
#               },
#               {
#                 "guitarString": 4,
#                 "fret": 5,
#                 "fill": "#EDAD0B"
#               }
#             ]
#           },
#           {
#             "position": 2,
#             "startFret": 11,
#             "endFret": 17,
#             "dots": [
#               {
#                 "guitarString": 6,
#                 "fret": 12,
#                 "fill": "#C7243A"
#               },
#               {
#                 "guitarString": 3,
#                 "fret": 16,
#                 "fill": "#555555"
#               }
#             ]
#           }
#         ]
#       TEXT
#     },
#     {
#       "title": 'C Minor Scale',
#       "is_public": true,
#       "score_code": <<~'TEXT'
#         [
#           {
#             "position": 1,
#             "startFret": 3,
#             "endFret": 6,
#             "dots": [
#               {
#                 "guitarString": 2,
#                 "fret": 3,
#                 "fill": "#007FB1"
#               },
#               {
#                 "guitarString": 4,
#                 "fret": 5,
#                 "fill": "#EDAD0B"
#               }
#             ]
#           },
#           {
#             "position": 2,
#             "startFret": 11,
#             "endFret": 17,
#             "dots": [
#               {
#                 "guitarString": 6,
#                 "fret": 12,
#                 "fill": "#C7243A"
#               },
#               {
#                 "guitarString": 3,
#                 "fret": 16,
#                 "fill": "#555555"
#               }
#             ]
#           }
#         ]
#       TEXT
#     },
#     {
#       "title": 'C 琉球音階',
#       "is_public": true,
#       "score_code": <<~'TEXT'
#         [
#           {
#             "position": 1,
#             "startFret": 3,
#             "endFret": 6,
#             "dots": [
#               {
#                 "guitarString": 2,
#                 "fret": 3,
#                 "fill": "#007FB1"
#               },
#               {
#                 "guitarString": 4,
#                 "fret": 5,
#                 "fill": "#EDAD0B"
#               }
#             ]
#           },
#           {
#             "position": 2,
#             "startFret": 11,
#             "endFret": 17,
#             "dots": [
#               {
#                 "guitarString": 6,
#                 "fret": 12,
#                 "fill": "#C7243A"
#               },
#               {
#                 "guitarString": 3,
#                 "fret": 16,
#                 "fill": "#555555"
#               }
#             ]
#           }
#         ]
#       TEXT
#     },
#     {
#       "title": 'E Minor Scale',
#       "is_public": false,
#       "score_code": <<~'TEXT'
#         [
#           {
#             "position": 1,
#             "startFret": 3,
#             "endFret": 6,
#             "dots": [
#               {
#                 "guitarString": 2,
#                 "fret": 3,
#                 "fill": "#007FB1"
#               },
#               {
#                 "guitarString": 4,
#                 "fret": 5,
#                 "fill": "#EDAD0B"
#               }
#             ]
#           },
#           {
#             "position": 2,
#             "startFret": 11,
#             "endFret": 17,
#             "dots": [
#               {
#                 "guitarString": 6,
#                 "fret": 12,
#                 "fill": "#C7243A"
#               },
#               {
#                 "guitarString": 3,
#                 "fret": 16,
#                 "fill": "#555555"
#               }
#             ]
#           }
#         ]
#       TEXT
#     },
#     {
#       "title": 'F Minor Scale',
#       "is_public": false,
#       "score_code": <<~'TEXT'
#         [
#           {
#             "position": 1,
#             "startFret": 3,
#             "endFret": 6,
#             "dots": [
#               {
#                 "guitarString": 2,
#                 "fret": 3,
#                 "fill": "#007FB1"
#               },
#               {
#                 "guitarString": 4,
#                 "fret": 5,
#                 "fill": "#EDAD0B"
#               }
#             ]
#           },
#           {
#             "position": 2,
#             "startFret": 11,
#             "endFret": 17,
#             "dots": [
#               {
#                 "guitarString": 6,
#                 "fret": 12,
#                 "fill": "#C7243A"
#               },
#               {
#                 "guitarString": 3,
#                 "fret": 16,
#                 "fill": "#555555"
#               }
#             ]
#           }
#         ]
#       TEXT
#     },
#     {
#       "title": 'G Minor Scale',
#       "is_public": false,
#       "score_code": <<~'TEXT'
#         [
#           {
#             "position": 1,
#             "startFret": 3,
#             "endFret": 6,
#             "dots": [
#               {
#                 "guitarString": 2,
#                 "fret": 3,
#                 "fill": "#007FB1"
#               },
#               {
#                 "guitarString": 4,
#                 "fret": 5,
#                 "fill": "#EDAD0B"
#               }
#             ]
#           },
#           {
#             "position": 2,
#             "startFret": 11,
#             "endFret": 17,
#             "dots": [
#               {
#                 "guitarString": 6,
#                 "fret": 12,
#                 "fill": "#C7243A"
#               },
#               {
#                 "guitarString": 3,
#                 "fret": 16,
#                 "fill": "#555555"
#               }
#             ]
#           }
#         ]
#       TEXT
#     },
#     {
#       "title": 'G BlueNote Scale',
#       "is_public": false,
#       "score_code": <<~'TEXT'
#         [
#           {
#             "position": 1,
#             "startFret": 3,
#             "endFret": 6,
#             "dots": [
#               {
#                 "guitarString": 2,
#                 "fret": 3,
#                 "fill": "#007FB1"
#               },
#               {
#                 "guitarString": 4,
#                 "fret": 5,
#                 "fill": "#EDAD0B"
#               }
#             ]
#           },
#           {
#             "position": 2,
#             "startFret": 11,
#             "endFret": 17,
#             "dots": [
#               {
#                 "guitarString": 6,
#                 "fret": 12,
#                 "fill": "#C7243A"
#               },
#               {
#                 "guitarString": 3,
#                 "fret": 16,
#                 "fill": "#555555"
#               }
#             ]
#           }
#         ]
#       TEXT
#     }
#   ]
# )
