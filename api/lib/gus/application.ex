defmodule GUS.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      GUSWeb.Telemetry,
      GUS.Repo,
      {DNSCluster, query: Application.get_env(:gus, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: GUS.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: GUS.Finch},
      # Start a worker by calling: GUS.Worker.start_link(arg)
      # {GUS.Worker, arg},
      # Start to serve requests, typically the last entry
      GUSWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: GUS.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    GUSWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
