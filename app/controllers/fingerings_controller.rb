# frozen_string_literal: true

class FingeringsController < ApplicationController
  skip_before_action :authenticate, only: %i[new show]
  before_action :set_fingering, only: %i[show]
  before_action :set_my_fingering, only: %i[edit update destroy]

  def index
    @fingerings = current_user.created_fingerings.order(updated_at: :desc).page(params[:page])
  end

  def show; end

  def new
    @fingering = Fingering.new
  end

  def edit; end

  def create
    @fingering = current_user.created_fingerings.build(fingering_params)
    if @fingering.save
      redirect_to @fingering, notice: 'Fingering was successfully created.'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def update
    if @fingering.update(fingering_params)
      redirect_to @fingering, notice: 'Fingering was successfully updated.'
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @fingering.destroy!

    redirect_to fingerings_url, notice: 'Fingering was successfully destroyed.'
  end

  private

  def set_fingering
    @fingering = Fingering.find(params[:id])
  end

  def set_my_fingering
    @fingering = current_user.created_fingerings.find(params[:id])
  end

  def fingering_params
    params.require(:fingering).permit(:id, :title, :is_public, :fingering_code)
  end
end
