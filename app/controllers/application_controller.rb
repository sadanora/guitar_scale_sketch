# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  protected

  def snakeize_params
    params.deep_snakeize!
  end
end
