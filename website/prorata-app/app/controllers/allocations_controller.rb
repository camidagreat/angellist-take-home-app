class AllocationsController < ApplicationController
  def index
  end

  def reconcile
    results = []
    # adjusted_request = (amount + average_amount) / 2
    # allocated_amount = 
    allocation_amount = params[:allocation_amount]
    investor_data = params[:investor_data]

    # adjusted requested are averaged with the average request of the investor.
    # this would advantage from knowing how many investments contribute to the investor's average amount
    adjusted_max_requests = investor_data.map{|i| {
      name: i[:name],
      adjusted_request: ((i[:amount] + i[:average_amount]) / 2),
      requested_amount: i[:amount]
    }}

    total_adjusted_request_sum = adjusted_max_requests.pluck('adjusted_request').sum
    adjusted_max_requests.each do |request|
      adjusted_allocation = allocation_amount * (request[:adjusted_amount] / total_adjusted_request_sum)
      if adjusted_allocation > request[:requested_amount]
        results.push({name: request[:name], amount: request[:requested_amount]})
      else
        results.push({name: request[:name], amount: adjusted_allocation})
      end
    end

    render json: results
  end
end
