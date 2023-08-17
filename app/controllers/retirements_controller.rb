# frozen_string_literal: true

class RetirementsController < ApplicationController
  def new; end

  def create
    return unless current_user.destroy

    reset_session
    redirect_to root_path, notice: '退会完了しました。'
  end
end
