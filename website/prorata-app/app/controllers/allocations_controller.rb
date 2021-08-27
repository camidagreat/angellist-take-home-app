class AllocationsController < ApplicationController
  def index
  end

  def reconcile
    results = []
    allocation_amount = params[:allocation_amount].to_f
    investor_data = params[:investor_data]
    requests_total = investor_data.pluck(:amount).map{|v| v.to_f}.sum

    # adjusted requested are averaged with the average request of the investor.
    # this would advantage from knowing how many investments contribute to the investor's average amount
    adjusted_requests = investor_data.map{|i| {
      name: i[:name],
      adjusted_request: ((i[:amount].to_f + i[:averageAmount].to_f) / 2),
      requested_amount: i[:amount].to_f
    }}
    
    # the sum of all of the adjusted amount
    total_adjusted_request_sum = adjusted_requests.pluck(:adjusted_request).sum

    adjusted_requests.each do |request|
      # calculate allocation amount with adjusted amounts based on averages
      adjusted_allocation = allocation_amount * (request[:adjusted_request] / total_adjusted_request_sum)
      if adjusted_allocation > request[:requested_amount] || allocation_amount > requests_total
        rounded_adjusted_amount = request[:requested_amount].round(2)
        results.push({name: request[:name], allocation: request[:requested_amount]})
      else
        rounded_adjusted_amount = adjusted_allocation.round(2)
        results.push({name: request[:name], allocation: rounded_adjusted_amount})
      end
    end
    render json: results
  end
end

# TO DO

# rounding is a little off when all allocations are rounded up (total sum allocations are slightly more than allocation_amount)
# there is one bug that causes the sum of the allocations to not equal the specified allocation_amount
# when an investor requests an amount FAR over the allocation_ammount, the allocations get all skewed towards that investor. I would want to protect against that
