const gameData = {
  chapters: [
    {
      id: 1,
      titleKey: 'ch1_title',
      introKey: 'ch1_intro',
      scenes: [
        {
          id: 'forest_1',
          characterKey: 'ch1_character1',
          dialogueKey: 'ch1_dialogue1',
          type: 'dialogue',
          choices: [
            { textKey: 'ch1_choice1', nextScene: 'forest_riddle_1', points: 50 },
            { textKey: 'ch1_choice2', nextScene: 'forest_info_1', points: 30 },
            { textKey: 'ch1_choice3', nextScene: 'forest_bad_1', points: 0 }
          ]
        },
        {
          id: 'forest_riddle_1',
          type: 'riddle',
          questionKey: 'ch1_riddle1',
          hintKey: 'ch1_riddle1_hint',
          answerKey: 'ch1_riddle1_answer',
          correctTextKey: 'ch1_success',
          nextScene: 'forest_end_1',
          points: 50
        },
        {
          id: 'forest_info_1',
          characterKey: 'ch1_character1',
          dialogue: 'The factory dumps toxic waste into our water sources. It seeps through the soil and poisons our roots. We are slowly dying.',
          nextScene: 'forest_riddle_1'
        },
        {
          id: 'forest_bad_1',
          characterKey: 'ch1_character1',
          dialogue: 'You turn away, but the forest\'s cry echoes in your heart. Perhaps you\'ll reconsider?',
          nextScene: 'forest_riddle_1'
        },
        {
          id: 'forest_end_1',
          characterKey: 'ch1_character1',
          dialogueKey: 'ch1_end',
          type: 'end_scene',
          nextScene: 'chapter_2'
        }
      ]
    },
    {
      id: 2,
      titleKey: 'ch2_title',
      introKey: 'ch2_intro',
      scenes: [
        {
          id: 'ocean_1',
          characterKey: 'ch2_character1',
          dialogueKey: 'ch2_dialogue1',
          type: 'dialogue',
          choices: [
            { textKey: 'ch2_choice1', nextScene: 'ocean_riddle_1', points: 50 },
            { textKey: 'ch2_choice2', nextScene: 'ocean_info_1', points: 30 },
            { textKey: 'ch2_choice3', nextScene: 'ocean_bad_1', points: 0 }
          ]
        },
        {
          id: 'ocean_riddle_1',
          type: 'riddle',
          questionKey: 'ch2_riddle1',
          hintKey: 'ch2_riddle1_hint',
          answerKey: 'ch2_riddle1_answer',
          correctTextKey: 'ch2_success',
          nextScene: 'ocean_end_1',
          points: 50
        },
        {
          id: 'ocean_info_1',
          characterKey: 'ch2_character1',
          dialogue: 'Every minute, tons of plastic enter the ocean. Sea turtles mistake bags for jellyfish and die. Whales\' stomachs are full of garbage. We need action now!',
          nextScene: 'ocean_riddle_1'
        },
        {
          id: 'ocean_bad_1',
          characterKey: 'ch2_character1',
          dialogue: 'It\'s never too late! Every action counts. Will you help?',
          nextScene: 'ocean_riddle_1'
        },
        {
          id: 'ocean_end_1',
          characterKey: 'ch2_character1',
          dialogueKey: 'ch2_end',
          type: 'end_scene',
          nextScene: 'chapter_3'
        }
      ]
    },
    {
      id: 3,
      titleKey: 'ch3_title',
      introKey: 'ch3_intro',
      scenes: [
        {
          id: 'wildlife_1',
          characterKey: 'ch3_character1',
          dialogueKey: 'ch3_dialogue1',
          type: 'dialogue',
          choices: [
            { textKey: 'ch3_choice1', nextScene: 'wildlife_riddle_1', points: 50 },
            { textKey: 'ch3_choice2', nextScene: 'wildlife_info_1', points: 30 },
            { textKey: 'ch3_choice3', nextScene: 'wildlife_bad_1', points: 0 }
          ]
        },
        {
          id: 'wildlife_riddle_1',
          type: 'riddle',
          questionKey: 'ch3_riddle1',
          hintKey: 'ch3_riddle1_hint',
          answerKey: 'ch3_riddle1_answer',
          correctTextKey: 'ch3_success',
          nextScene: 'wildlife_end_1',
          points: 50
        },
        {
          id: 'wildlife_info_1',
          characterKey: 'ch3_character1',
          dialogue: 'Habitat loss is the biggest threat to wildlife. If we don\'t protect these spaces, thousands of species will vanish forever.',
          nextScene: 'wildlife_riddle_1'
        },
        {
          id: 'wildlife_bad_1',
          characterKey: 'ch3_character1',
          dialogue: 'Money won\'t matter on a dead planet. Nature\'s survival IS economic growth.',
          nextScene: 'wildlife_riddle_1'
        },
        {
          id: 'wildlife_end_1',
          characterKey: 'ch3_character1',
          dialogueKey: 'ch3_end',
          type: 'end_scene',
          nextScene: 'game_end'
        }
      ]
    }
  ]
};
