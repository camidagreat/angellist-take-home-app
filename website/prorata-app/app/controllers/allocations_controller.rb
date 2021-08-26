class AllocationsController < ApplicationController
  def index
  end

  def reconcile
    results = [{name: 'Luke', allocation: 1234}]
    # adjusted_request = (amount + average_amount) / 2
    # allocated_amount = 
    investor_data = params[:investor_data]
    adjusted_amounts = investor_data

    render json: results
  end
end
