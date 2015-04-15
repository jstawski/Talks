using System;
using Cirrious.MvvmCross.ViewModels;
using TipCalc.Core.Services;

namespace TipCalc.Core.ViewModels
{
	public class SettingsViewModel : MvxViewModel
	{
		public readonly Acr.MvvmCross.Plugins.Settings.ISettingsService _settingsService;

		public SettingsViewModel(Acr.MvvmCross.Plugins.Settings.ISettingsService settingsService)
		{
			_settingsService = settingsService;
		}

		public override void Start()
		{
			var subTotal = _settingsService.Get("SubTotal", "100.00");
			Double.TryParse(subTotal, out _subTotal);

			var generosity = _settingsService.Get("Generosity", "10");
			int.TryParse(generosity, out _generosity);

			base.Start();
		}

		private double _subTotal;

		public double SubTotal
		{
			get { return _subTotal; }
			set { _subTotal = value; RaisePropertyChanged(() => SubTotal); _settingsService.Set("SubTotal", value.ToString()); }
		}

		private int _generosity;

		public int Generosity
		{
			get { return _generosity; }
			set { _generosity = value; RaisePropertyChanged(() => Generosity); _settingsService.Set("Generosity", value.ToString()); }
		}
	}
}

