class AllocationsController < ApplicationController
  def index
  end

  def reconcile
    investor_data = params[:investor_data]
    render json: investor_data
  end
end
