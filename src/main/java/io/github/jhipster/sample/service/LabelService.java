package io.github.jhipster.sample.service;

import io.github.jhipster.sample.domain.Label;
import io.github.jhipster.sample.repository.LabelRepository;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link io.github.jhipster.sample.domain.Label}.
 */
@Service
@Transactional
public class LabelService {

    private final Logger log = LoggerFactory.getLogger(LabelService.class);

    private final LabelRepository labelRepository;

    public LabelService(LabelRepository labelRepository) {
        this.labelRepository = labelRepository;
    }

    /**
     * Save a label.
     *
     * @param label the entity to save.
     * @return the persisted entity.
     */
    public Label save(Label label) {
        log.debug("Request to save Label : {}", label);
        return labelRepository.save(label);
    }

    /**
     * Update a label.
     *
     * @param label the entity to save.
     * @return the persisted entity.
     */
    public Label update(Label label) {
        log.debug("Request to update Label : {}", label);
        return labelRepository.save(label);
    }

    /**
     * Partially update a label.
     *
     * @param label the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<Label> partialUpdate(Label label) {
        log.debug("Request to partially update Label : {}", label);

        return labelRepository
            .findById(label.getId())
            .map(existingLabel -> {
                if (label.getLabelName() != null) {
                    existingLabel.setLabelName(label.getLabelName());
                }

                return existingLabel;
            })
            .map(labelRepository::save);
    }

    /**
     * Get all the labels.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<Label> findAll(Pageable pageable) {
        log.debug("Request to get all Labels");
        return labelRepository.findAll(pageable);
    }

    /**
     * Get one label by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<Label> findOne(Long id) {
        log.debug("Request to get Label : {}", id);
        return labelRepository.findById(id);
    }

    /**
     * Delete the label by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Label : {}", id);
        labelRepository.deleteById(id);
    }
}
