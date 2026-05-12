"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const pagination_dto_1 = require("../../domain/dtos/pagination/pagination.dto");
const create_review_dto_1 = require("../../domain/dtos/review/create-review.dto");
const update_review_dto_1 = require("../../domain/dtos/review/update-review.dto");
const handle_error_1 = require("../../config/handle-error");
class ReviewController {
    reviewRepository;
    logger;
    constructor(reviewRepository, logger) {
        this.reviewRepository = reviewRepository;
        this.logger = logger;
    }
    getAll = (req, res) => {
        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = pagination_dto_1.PaginationDto.create({ page: +page, limit: +limit });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.reviewRepository
            .findAll(paginationDto)
            .then((result) => res.status(200).json(result))
            .catch((err) => {
            this.logger.error(`getAll - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getById = (req, res) => {
        const { id } = req.params;
        this.reviewRepository
            .findById(String(id))
            .then((review) => res.status(200).json(review))
            .catch((err) => {
            this.logger.error(`getById - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getByProductId = (req, res) => {
        const { productId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = pagination_dto_1.PaginationDto.create({ page: +page, limit: +limit });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.reviewRepository
            .findByProductId(String(productId), paginationDto)
            .then((result) => res.status(200).json(result))
            .catch((err) => {
            this.logger.error(`getByProductId - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    getByUserId = (req, res) => {
        const { userId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const [error, paginationDto] = pagination_dto_1.PaginationDto.create({ page: +page, limit: +limit });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.reviewRepository
            .findByUserId(String(userId), paginationDto)
            .then((result) => res.status(200).json(result))
            .catch((err) => {
            this.logger.error(`getByUserId - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    create = (req, res) => {
        const [error, createReviewDto] = create_review_dto_1.CreateReviewDto.create(req.body);
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.reviewRepository
            .create(createReviewDto)
            .then((review) => res.status(201).json(review))
            .catch((err) => {
            this.logger.error(`create - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    update = (req, res) => {
        const [error, updateReviewDto] = update_review_dto_1.UpdateReviewDto.create({ ...req.body, id: String(req.params.id) });
        if (error) {
            res.status(400).json({ error });
            return;
        }
        this.reviewRepository
            .update(updateReviewDto)
            .then((review) => res.status(200).json(review))
            .catch((err) => {
            this.logger.error(`update - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
    delete = (req, res) => {
        const { id } = req.params;
        this.reviewRepository
            .delete(String(id))
            .then((review) => res.status(200).json(review))
            .catch((err) => {
            this.logger.error(`delete - ${err}`);
            (0, handle_error_1.handleError)(err, res);
        });
    };
}
exports.ReviewController = ReviewController;
//# sourceMappingURL=controller.js.map