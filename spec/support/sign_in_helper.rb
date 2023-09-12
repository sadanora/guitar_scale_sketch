# frozen_string_literal: true

module SignInHelper
  def sign_in_as(user)
    OmniAuth.config.test_mode = true
    OmniAuth.config.add_mock(
      user.provider,
      { uid: user.uid, info: { image: user.image_url } }
    )
    visit root_path
    find('.google-login-button').click
  end
end
