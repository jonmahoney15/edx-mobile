// @ts-nocheck
// Taken from openedx mfe learning
export function normalizeOutlineBlocks(courseId, blocks) {
    const models = {
      courses: {},
      sections: {},
      sequences: {},
    };
    Object.values(blocks).forEach(block => {
      switch (block.type) {
        case 'course':
          models.courses[block.id] = {
            id: courseId,
            title: block.display_name,
            sectionIds: block.children || [],
            hasScheduledContent: block.has_scheduled_content,
          };
          break;
  
        case 'chapter':
          models.sections[block.id] = {
            complete: block.complete,
            id: block.id,
            title: block.display_name,
            resumeBlock: block.resume_block,
            sequenceIds: block.children || [],
          };
          break;
  
        case 'sequential':
          models.sequences[block.id] = {
            complete: block.complete,
            description: block.description,
            due: block.due,
            effortActivities: block.effort_activities,
            effortTime: block.effort_time,
            icon: block.icon,
            id: block.id,
            showLink: !!block.lms_web_url,
            title: block.display_name,
            lms_web_url: block.lms_web_url
          };
          break;
  
        default:
          logInfo(`Unexpected course block type: ${block.type} with ID ${block.id}.  Expected block types are course, chapter, and sequential.`);
      }
    });
  
    // Next go through each list and use their child lists to decorate those children with a
    // reference back to their parent.
    Object.values(models.courses).forEach(course => {
      if (Array.isArray(course.sectionIds)) {
        course.sectionIds.forEach(sectionId => {
          const section = models.sections[sectionId];
          section.courseId = course.id;
        });
      }
    });
  
    Object.values(models.sections).forEach(section => {
      if (Array.isArray(section.sequenceIds)) {
        section.sequenceIds.forEach(sequenceId => {
          if (sequenceId in models.sequences) {
            models.sequences[sequenceId].sectionId = section.id;
          } else {
            logInfo(`Section ${section.id} has child block ${sequenceId}, but that block is not in the list of sequences.`);
          }
        });
      }
    });
  
    return models;
}
  