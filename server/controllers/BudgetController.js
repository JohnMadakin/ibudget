import BaseController from "./BaseController";

class BudgetController extends BaseController {
  static createBudget(req, res) {
    return super.successResponse(res, 'Budget Created', 200);
  }
}
