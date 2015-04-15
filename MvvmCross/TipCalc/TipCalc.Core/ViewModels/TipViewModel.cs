using System;
using Cirrious.MvvmCross.ViewModels;
using TipCalc.Core.Services;
using System.Windows.Input;

namespace TipCalc.Core.ViewModels
{
	public class TipViewModel : MvxViewModel
	{
		public readonly ICalculationService _calculationService;
		public readonly Acr.MvvmCross.Plugins.Settings.ISettingsService _settingsService;
		public TipViewModel(ICalculationService calculationService, Acr.MvvmCross.Plugins.Settings.ISettingsService settingsService)
		{
			_calculationService = calculationService;
			_settingsService = settingsService;
		}

		public override void Start()
		{
			var subTotal = _settingsService.Get("SubTotal", "100.00");
			Double.TryParse(subTotal, out _subTotal);

			var generosity = _settingsService.Get("Generosity", "10");
			int.TryParse(generosity, out _generosity);
			Recalculate();
			base.Start();
		}

		private double _subTotal;

		public double SubTotal
		{
			get { return _subTotal; }
			set { _subTotal = value; RaisePropertyChanged(() => SubTotal); Recalculate(); }
		}

		private int _generosity;

		public int Generosity
		{
			get { return _generosity; }
			set { _generosity = value; RaisePropertyChanged(() => Generosity); Recalculate(); }
		}

		private double _tip;

		public double Tip
		{
			get { return _tip; }
			set { _tip = value; RaisePropertyChanged(() => Tip);}
		}

		private void Recalculate()
		{
			Tip = _calculationService.TipAmount(SubTotal, Generosity);
		}

		public ICommand Settings
		{
			get
			{
				return new MvxCommand(() => ShowViewModel<SettingsViewModel>());
			}
		}
	}
}

