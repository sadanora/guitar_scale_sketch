# frozen_string_literal: true

module SignInHelper
  def sign_in_as(user)
    OmniAuth.config.test_mode = true
    OmniAuth.config.add_mock(
      user.provider,
      { uid: user.uid, info: { image: user.image_url } }
    )
    visit root_path
    click_on 'Googleでログインして指板図をつくる'
  end
end
